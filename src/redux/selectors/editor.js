import { createSelector } from 'reselect';

const getEditor = state => state.editor;

function getPercentComplete(editor) {
  let percent = 0;
  const rules = ['actor', 'event', 'target', 'template'];

  rules.forEach(rule => {
    if (editor[rule]) {
      percent += 20;
    }
  });

  if (editor.name.length) {
    percent += 20;
  }

  return percent;
}

export const getEditorState = createSelector(getEditor, editor => {
  const percent = getPercentComplete(editor);

  return {
    values: editor,
    percent,
  };
});
