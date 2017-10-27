import { createSelector } from 'reselect';

const getEditor = state => state.editor;

const rules = ['actor', 'event', 'target', 'template'];

function getPercentComplete(editor) {
  let percent = 0;

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

const getActiveElement = editor => rules.find(rule => !editor[rule]);

function getDisabledElements(editor, activeElement) {
  const disabledElements = [];
  let foundActive = false;

  rules.forEach(rule => {
    if (rule === activeElement) {
      foundActive = true;
    } else if (foundActive) {
      disabledElements.push(rule);
    }
  });

  return disabledElements;
}

export const getEditorState = createSelector(getEditor, editor => {
  const percent = getPercentComplete(editor);
  const activeElement = getActiveElement(editor);
  const disabledElements = getDisabledElements(editor, activeElement);

  return {
    values: editor,
    activeElement,
    disabledElements,
    percent,
  };
});
