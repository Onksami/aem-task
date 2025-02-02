export default function decorate(block) {
  const cols = [...block.children];
  block.classList.add("prject-features-container");
  block.classList.add(`columns-${cols.length}-cols`);
  // Setup feature items
  cols.forEach((feature) => {
    feature.classList.add("prject-feature-item");

    const imgContainer = feature.querySelector("picture");
    const title = feature.querySelector("div:nth-child(2) p");
    const description = feature.querySelector("div:nth-child(3) p");

    if (imgContainer) {
      const imgWrapper = imgContainer.closest("div");
      if (imgWrapper && imgWrapper.children.length === 1) {
        imgWrapper.classList.add("prject-feature-img-container");
      }
    }

    if (title) {
      title.classList.add("prject-feature-title");
    }

    if (description) {
      description.classList.add("prject-feature-description");
    }
  });
}
