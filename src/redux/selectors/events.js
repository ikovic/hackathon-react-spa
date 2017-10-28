import { createSelector } from 'reselect';

const getSelectedActorId = state => state.editor.actor;
const getActors = state => state.actors.items;
const getEvents = state => state.events;

const defaultEvents = [];

export const getFilteredEvents = createSelector(
  getSelectedActorId,
  getActors,
  getEvents,
  (actorId, actors, events) => {
    const selectedActor = actors.find(({ id }) => id === actorId);

    if (!selectedActor) return defaultEvents;

    const items = events.items.filter(({ actor }) => actor === selectedActor.type);

    return {
      ...events,
      items,
    };
  },
);
