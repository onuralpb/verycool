export const loader = (loadInfo, el) => {
  if (loadInfo) {
    const loadingHtml = `
        <div id="loaderContent">
          <div class="ball-pulse">
              <div></div>
              <div></div>
              <div></div>
          </div>
        </div>
    `;
    el.insertAdjacentHTML("afterbegin", loadingHtml);
  } else {
    const loaderContent = document.getElementById("loaderContent");
    loaderContent.remove();
  }
};
