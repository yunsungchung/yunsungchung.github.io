(() => {
  const archive = document.querySelector(".publication-archive");
  const input = document.querySelector("#publication-search");
  if (!archive || !input) return;

  const normalize = (text) =>
    text
      .normalize("NFKD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
  const papers = [...archive.querySelectorAll(".archive-paper")].map((paper) => ({
    element: paper.closest("li"),
    text: normalize(paper.textContent),
  }));
  const lists = [...archive.querySelectorAll("ol.bibliography")];
  const count = document.querySelector(".archive-count");
  const empty = document.querySelector(".archive-empty");

  const filter = () => {
    const terms = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    papers.forEach((paper) => {
      const match = terms.every((term) => paper.text.includes(term));
      paper.element.hidden = !match;
      if (match) visible += 1;
    });
    lists.forEach((list) => {
      const hidden = ![...list.children].some((item) => !item.hidden);
      list.hidden = hidden;
      const heading = list.previousElementSibling;
      if (heading?.matches("h2.bibliography")) heading.hidden = hidden;
    });
    count.textContent = terms.length ? `${visible} of ${papers.length} publications` : `${papers.length} publications`;
    archive.hidden = visible === 0;
    empty.hidden = visible !== 0;
  };

  input.addEventListener("input", filter);
  // A deep link should remain visible even after a prior search.
  window.addEventListener("hashchange", () => {
    input.value = "";
    filter();
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target?.matches(".archive-paper")) target.scrollIntoView();
  });
  document.querySelector(".archive-tools").hidden = false;
  filter();
})();
