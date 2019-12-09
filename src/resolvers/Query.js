const FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS = `
  fragment TodoListsWithTags on TodoList {
    id
    title
    tags {
      id
      title
      color
    }
    tasks {
      id
      reminder
      createdAt
      description
      state
      deadline
      tags {
        id
        color
        title
      }
    }
  }
`;

const todoLists = async (_parent, _args, context) => {
  return await context.prisma
    .todoLists({ orderBy: "createdAt_DESC" })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const todoList = async (_parent, args, context) => {
  return await context.prisma
    .todoList({ id: args.id })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const tags = async (_parent, _args, context) => {
  return await context.prisma.tags({ orderBy: "createdAt_DESC" });
};

module.exports = {
  todoLists,
  todoList,
  tags
};
