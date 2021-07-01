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
      const newDiv = documentfi.createElement("div");

      newDiv.innerHTML = `<div
     style="display: flex; flex-direction: row;"
    class="custom-toolbox">
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="issue" title="Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a suggestion. If you are not sure if a problem exists or not, consider leaving a question.">❗️</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="chore" title="Chores are simple tasks that must be done before the subject can be “officially” accepted. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.">🟡</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="question" title="Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.">❓</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="suggestion" title="Suggestions propose improvements to the current subject. It's important to be explicit and clear on what is being suggested and why it is an improvement. Consider using patches and the blocking or non-blocking decorations to further communicate your intent.">🛠</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="thought" title="Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.">💬</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="nitpick" title="Nitpicks are small, trivial, but necessary changes. Distinguishing nitpick comments significantly helps direct the reader's attention to comments requiring more involvement.">⛏️</div>
    <div style="cursor: pointer; margin-left: 10px;" class="set-level" data-level="praise" title="Praises highlight something positive. Try to leave at least one of these comments per review. Do not leave false praise (which can actually be damaging). Do look for something to sincerely praise.">🔥</div>
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
