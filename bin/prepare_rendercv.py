"""Adapt the website's CV fields without changing its public YAML or final PDF."""

import copy
import sys
from pathlib import Path

import yaml


def prepare(data):
    data = copy.deepcopy(data)
    cv = data["cv"]
    if "label" in cv:
        cv["headline"] = cv.pop("label")
    if "image" in cv:
        image = cv.pop("image")
        if image:
            cv["photo"] = image
    summary = cv.pop("summary", None)
    sections = cv["sections"]
    if summary:
        cv["sections"] = {"Professional Summary": [summary], **sections}
    for entry in sections.get("Education", []):
        if "studyType" in entry:
            entry["degree"] = entry.pop("studyType")
        # YAML treats an unquoted `Label: value` highlight as a mapping.
        if "highlights" in entry:
            entry["highlights"] = [
                "; ".join(f"{key}: {value}" for key, value in item.items())
                if isinstance(item, dict) else item
                for item in entry["highlights"]
            ]
    for entry in sections.get("Publications", []):
        if "publisher" in entry:
            entry["journal"] = entry.pop("publisher")
        if "releaseDate" in entry:
            entry["date"] = entry.pop("releaseDate")
    for entry in sections.get("Awards", []):
        if "title" in entry:
            entry["name"] = entry.pop("title")
    for entry in sections.get("Skills", []):
        # RenderCV's normal-entry template displays summary, not keywords/level.
        parts = [entry.pop(key) for key in ("level", "keywords") if key in entry]
        if parts:
            entry["summary"] = "; ".join(parts)
    return data


if __name__ == "__main__":
    source, target = map(Path, sys.argv[1:])
    data = yaml.safe_load(source.read_text())
    target.write_text(yaml.safe_dump(prepare(data), sort_keys=False, allow_unicode=True))
