const getToDos = () => {
    const app = document.getElementById("app");
    app.innerHTML = "";
  
    var TodoLists = localStorage.getItem("TodoLists");
    if (!TodoLists) {
      app.innerHTML = "<h3>Nothing Added</h3>";
    } else {
      if (TodoLists.length == 0) {
        app.innerHTML = "<h3>No Todo Lists</h3>";
      } else {
        TodoLists = JSON.parse(localStorage.getItem("TodoLists"));
  
        console.log(TodoLists);
        // sorting function
  
        if (TodoLists.length > 1) {
          function compare(a, b) {
            if (a.id < b.id) {
              return -1;
            }
            if (a.id > b.id) {
              return 1;
            }
            return 0;
          }
          TodoLists = TodoLists.reverse(compare);
        } else {
          // TodoLists = TodoLists.sort();
        }
  
        TodoLists.map((todo, index) => {
          app.innerHTML += ` 
                              <div class="container ${
                                todo.completed == 1 ? "completed" : ""
                              }" > 
                                  <div class="row">
                                      <button class="delete" onclick="DeleteToDo(${
                                        todo.id
                                      })">
                                          <svg class="svg-icon" viewBox="0 0 20 20">
                                              <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                                          </svg>    
                                      </button>
  
                                  </div>
                                  
                                  <div class="row" onclick="CompleteToDo(${
                                    todo.id
                                  })">
                                      <h3> ${todo.title}</h3> 
                                  <span> ${todo.detail}</span>
  
                                  <div style="display:flex"> 
                                      <small style="flex-grow:1">
                                          <svg class="svg-icon" viewBox="0 0 20 20">
                                              <path fill="none" d="M11.088,2.542c0.063-0.146,0.103-0.306,0.103-0.476c0-0.657-0.534-1.19-1.19-1.19c-0.657,0-1.19,0.533-1.19,1.19c0,0.17,0.038,0.33,0.102,0.476c-4.085,0.535-7.243,4.021-7.243,8.252c0,4.601,3.73,8.332,8.332,8.332c4.601,0,8.331-3.73,8.331-8.332C18.331,6.562,15.173,3.076,11.088,2.542z M10,1.669c0.219,0,0.396,0.177,0.396,0.396S10.219,2.462,10,2.462c-0.22,0-0.397-0.177-0.397-0.396S9.78,1.669,10,1.669z M10,18.332c-4.163,0-7.538-3.375-7.538-7.539c0-4.163,3.375-7.538,7.538-7.538c4.162,0,7.538,3.375,7.538,7.538C17.538,14.957,14.162,18.332,10,18.332z M10.386,9.26c0.002-0.018,0.011-0.034,0.011-0.053V5.24c0-0.219-0.177-0.396-0.396-0.396c-0.22,0-0.397,0.177-0.397,0.396v3.967c0,0.019,0.008,0.035,0.011,0.053c-0.689,0.173-1.201,0.792-1.201,1.534c0,0.324,0.098,0.625,0.264,0.875c-0.079,0.014-0.155,0.043-0.216,0.104l-2.244,2.244c-0.155,0.154-0.155,0.406,0,0.561s0.406,0.154,0.561,0l2.244-2.242c0.061-0.062,0.091-0.139,0.104-0.217c0.251,0.166,0.551,0.264,0.875,0.264c0.876,0,1.587-0.711,1.587-1.587C11.587,10.052,11.075,9.433,10.386,9.26z M10,11.586c-0.438,0-0.793-0.354-0.793-0.792c0-0.438,0.355-0.792,0.793-0.792c0.438,0,0.793,0.355,0.793,0.792C10.793,11.232,10.438,11.586,10,11.586z"></path>
                                          </svg>
                                          ${todo.time}
                                      </small>
                                      ${
                                        todo.completed == 1
                                          ? "<small>Done</small>"
                                          : ""
                                      }
                                  </div>
                                  </div>
                              </div> `;
        });
      }
    }
  };
  
  const CloseForm = () => {
    document.getElementById("triger-body").style.display = "none";
    document.getElementById("triger-header").style.display = "flex";
  };
  const OpenForm = () => {
    document.getElementById("triger-body").style.display = "block";
    //  document.getElementById("triger-header").style.display = "none";
  };
  
  const saveToDos = (e) => {
    e.preventDefault();
    var title = document.getElementById("title").value;
    var detail = document.getElementById("detail").value;
    var time = document.getElementById("time").value;
    var dataTodo = [];
    if (!title || !time) {
      alert("You must enter values for title, time and detail");
    } else {
      var todo = {
        id: 1,
        title: title,
        detail: detail,
        time: time,
        completed: 0
      };
  
      var TodoLists = localStorage.getItem("TodoLists");
      if (!TodoLists) {
        dataTodo.push(todo);
        todo = JSON.stringify(dataTodo);
        localStorage.setItem("TodoLists", todo);
      } else {
        TodoLists = JSON.parse(TodoLists);
        var newTodo = {
          ...todo,
          id: TodoLists.length + 1
        };
        TodoLists.push(newTodo);
        localStorage.setItem("TodoLists", JSON.stringify(TodoLists));
      }
      document.getElementById("title").value = "";
      document.getElementById("detail").value = "";
      document.getElementById("time").value = "";
      CloseForm();
    }
  
    getToDos();
  };
  
  const CompleteToDo = (id) => {
    var TodoLists = JSON.parse(localStorage.getItem("TodoLists"));
    TodoLists.map((todo, index) => {
      var FilteredTodo = TodoLists.filter((todo) => todo.id != id);
      if (todo.id == id) {
        if (todo.completed == 0) {
          var updatedTodo = {
            ...todo,
            completed: 1
          };
        } else {
          var updatedTodo = {
            ...todo,
            completed: 0
          };
        }
  
        FilteredTodo.push(updatedTodo);
        localStorage.setItem("TodoLists", JSON.stringify(FilteredTodo));
      }
    });
    getToDos();
  };
  
  const DeleteToDo = (id) => {
    var TodoLists = JSON.parse(localStorage.getItem("TodoLists"));
    TodoLists.map((todo, index) => {
      if (todo.id == id) {
        var FilteredTodo = TodoLists.filter((todo) => todo.id != id);
        localStorage.setItem("TodoLists", JSON.stringify(FilteredTodo));
      }
    });
    getToDos();
  };
  
  getToDos();
  CloseForm();