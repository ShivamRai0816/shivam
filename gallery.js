document.addEventListener("DOMContentLoaded", async () => {
  const galleryContainer = document.getElementById("galleryContainer");

  try {
    const res = await fetch("/api/content");
    const data = await res.json();

    if (data.length === 0) {
      galleryContainer.innerHTML = "<p>No projects available.</p>";
      return;
    }

    data.forEach((item) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `
        <img src="${item.image_url}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      `;
      galleryContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load gallery:", err);
    galleryContainer.innerHTML = "<p style='color:red;'>Could not load gallery items.</p>";
  }
});
