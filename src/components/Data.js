const Data = {
    employee: 'Sam', 
    projects: [
        {id: 0, name: 'Project 1', tasks: [{id: 0, name: 'Task11'}, {id: 1, name: 'Task21'}, {id: 2, name: 'Task31'}]}, 
        {id: 1, name: 'Project 2', tasks: [{id: 3, name: 'Task12'}, {id: 4, name: 'Task22'}, {id: 5, name: 'Task32'}]}, 
        {id: 2, name: 'Project 3', tasks: [{id: 6, name: 'Task13'}, {id: 7, name: 'Task23'}, {id: 8, name: 'Task33'}]}
    ], 
    workType: [
        {id: 0, name: 'NZ ordinary hours'},
        {id: 1, name: 'NZ overtime'}, 
        {id: 2, name: 'AUS ordinary hours'}, 
        {id: 3, name: 'AUS overtime'} 
    ]
}
export default Data; 