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

const TASK_WITH_TAGS = `
  fragment TaskWithTags on Task {
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
`;

const createTodoList = async (_parent, args, context) => {
  return await context.prisma
    .createTodoList({
      title: args.title,
      tags: {
        connect: args.tagIDs
          ? args.tagIDs.map(tagID => {
              return { id: tagID };
            })
          : [],
        create: args.tags
          ? args.tags.map(tag => {
              return { title: tag.title, color: tag.color };
            })
          : []
      },
      tasks: {
        create: args.tasks
          ? args.tasks.map(task => {
              return {
                description: task.description,
                deadline: task.deadline,
                reminder: task.reminder,
                state: task.state || "InProgress",
                tags: {
                  connect: task.tagIDs
                    ? task.tagIDs.map(tagID => {
                        return { id: tagID };
                      })
                    : []
                }
              };
            })
          : []
      }
    })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const updateTodoList = async (_parent, args, context) => {
  return await context.prisma
    .updateTodoList({
      where: {
        id: args.id
      },
      data: {
        title: args.title
      }
    })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const deleteTodoList = async (_parent, args, context) => {
  return await context.prisma
    .deleteTodoList({
      id: args.id
    })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const addTagsToTodoList = async (_parent, args, context) => {
  return await context.prisma
    .updateTodoList({
      where: {
        id: args.id
      },
      data: {
        tags: {
          connect: args.tagIDs
            ? args.tagIDs.map(tagID => {
                return { id: tagID };
              })
            : [],
          create: args.tags
            ? args.tags.map(tag => {
                return { title: tag.title, color: tag.color };
              })
            : []
        }
      }
    })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const deleteTagsFromTodoList = async (_parent, args, context) => {
  return await context.prisma
    .updateTodoList({
      where: {
        id: args.id
      },
      data: {
        tags: {
          disconnect: args.tagIDs
            ? args.tagIDs.map(id => {
                return { id };
              })
            : []
        }
      }
    })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const addTasksToTodoList = async (_parent, args, context) => {
  return await context.prisma
    .updateTodoList({
      where: {
        id: args.id
      },
      data: {
        tasks: {
          create: args.tasks.map(task => {
            return {
              description: task.description,
              deadline: task.deadline,
              reminder: task.reminder,
              state: task.state || "InProgress",
              tags: task.tagIDs
                ? {
                    connect: task.tagIDs.map(tagID => {
                      return { id: tagID };
                    })
                  }
                : null
            };
          })
        }
      }
    })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const updateTaskInTodoList = async (_parent, args, context) => {
  return await context.prisma
    .updateTask({
      where: {
        id: args.id
      },
      data: {
        description: args.description,
        deadline: args.deadline,
        reminder: args.reminder,
        state: args.state
      }
    })
    .$fragment(TASK_WITH_TAGS);
};

const deleteTasksFromTodoList = async (_parent, args, context) => {
  return await context.prisma
    .updateTodoList({
      where: {
        id: args.id
      },
      data: {
        tasks: {
          disconnect: args.taskIDs
            ? args.taskIDs.map(id => {
                return { id };
              })
            : []
        }
      }
    })
    .$fragment(FRAGMENT_TODO_LIST_WITH_TAGS_AND_TASKS);
};

const addTagsToTask = async (_parent, args, context) => {
  return await context.prisma
    .updateTask({
      where: {
        id: args.id
      },
      data: {
        tags: {
          connect: args.tagIDs
            ? args.tagIDs.map(tagID => {
                return { id: tagID };
              })
            : [],
          create: args.tags
            ? args.tags.map(tag => {
                return { title: tag.title, color: tag.color };
              })
            : []
        }
      }
    })
    .$fragment(TASK_WITH_TAGS);
};

const deleteTagsFromTask = async (_parent, args, context) => {
  return await context.prisma
    .updateTask({
      where: {
        id: args.id
      },
      data: {
        tags: {
          disconnect: args.tagIDs
            ? args.tagIDs.map(id => {
                return { id };
              })
            : []
        }
      }
    })
    .$fragment(TASK_WITH_TAGS);
};

const createTag = async (_parent, args, context) => {
  return await context.prisma.createTag({
    title: args.title,
    color: args.color
  });
};

const updateTag = async (_parent, args, context) => {
  return await context.prisma.updateTag({
    where: {
      id: args.id
    },
    data: {
      title: args.title,
      color: args.color
    }
  });
};

const deleteTag = async (_parent, args, context) => {
  return await context.prisma.deleteTag({
    id: args.id
  });
};

module.exports = {
  createTodoList,
  updateTodoList,
  deleteTodoList,

  addTagsToTodoList,
  deleteTagsFromTodoList,

  addTasksToTodoList,
  updateTaskInTodoList,
  deleteTasksFromTodoList,

  addTagsToTask,
  deleteTagsFromTask,

  createTag,
  updateTag,
  deleteTag
};
