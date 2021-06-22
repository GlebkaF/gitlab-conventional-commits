setInterval(() => {
  const commentHeaders = document.querySelectorAll(
    ".comment-warning-wrapper .nav-links"
  );

  Array.from(commentHeaders).forEach((commentHeaderWrapper) => {
    const tabs = commentHeaderWrapper.querySelectorAll(".md-header-tab");

    if (!tabs) {
      return;
    }

    const commentHeader = Array.from(tabs).slice(-1)[0];

    if (
      commentHeader &&
      !commentHeader.parentElement.querySelector(".custom-toolbox")
    ) {
      const newDiv = document.createElement("div");

      newDiv.innerHTML = `<div
     style="display: flex; flex-direction: row;"
    class="custom-toolbox">
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="issue">❗️</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="chore">🟡</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="question">❓</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="suggestion">🛠</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="thought">💬</div>
    </div>`;
      Array.from(newDiv.querySelectorAll(".set-level")).forEach((node) => {
        node.addEventListener("click", (e) => {
          const title = node.attributes["data-level"].value;
          const emoji = node.textContent;

          const message = `${emoji}**${title}**`;

          const container = findParentBy(node, (node) =>
            node.classList.contains("js-vue-markdown-field")
          );

          if (!container) {
            return;
          }

          const textarea = container.querySelector(`textarea`);

          textarea.value = `${message} ${textarea.value}`;

          const event = new MouseEvent("change", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          textarea.dispatchEvent(event);
        });
      });
      commentHeader.after(newDiv);
    }
  });
}, 2000);

function findParentBy(node, callback) {
  const parent = node.parentNode;
  if (!parent) {
    return null;
  }

  if (callback(parent)) {
    return parent;
  }

  return findParentBy(parent, callback);
}
