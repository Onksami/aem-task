export default function decorate(block) {
  console.log("webinarPortal", block);

  // parent div'i alıyoruz
  const parentDiv = block.querySelector(".webinarportal.block");

  // child div'leri alıyoruz
  const childDivs = parentDiv ? [...parentDiv.children] : [];

  // featuresData objesini oluşturuyoruz
  const featuresData = {
    title: childDivs[0]?.textContent.trim() || "", // 1. child div: title
    text: childDivs[1]?.textContent.trim() || "", // 2. child div: text
  };

  // Objeyi konsola yazdırıyoruz
  console.log(featuresData);

  return featuresData; // featuresData objesini döndürüyoruz
}
