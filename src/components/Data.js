const Data = {
    employee: 'Sam', 
    projects: [
        {id: -1, name: 'Select a project ...', tasks:[]},
        {id: 0, name: 'Datacom Internal: K38125 IF0025', tasks: [{id: -1, name: 'Select a task ...'}, {id: 0, name: 'Task11'}, {id: 1, name: 'Task21'}, {id: 2, name: 'Task31'}]}, 
        {id: 1, name: 'Datacom Internal: K38017 AKL SERVICE', tasks: [{id: -1, name: 'Select a task ...'}, {id: 3, name: 'Task12'}, {id: 4, name: 'Task22'}, {id: 5, name: 'Task32'}]}, 
        {id: 2, name: 'Datacom Internal: K38113 IF0025 Ecosystem Customer', tasks: [{id: -1, name: 'Select a task ...'}, {id: 6, name: 'RBNZ Workday [Integration]'}, {id: 7, name: 'Rabobank Workday [Integration]'}, {id: 9, name: 'GNS/ESR Workday [Integration]'}, {id: 8, name: 'Transition [Integration]'}]}
    ], 
    workType: [
        {id: -1, name: 'Select a work type ...'},
        {id: 0, name: 'NZ ordinary hours'},
        {id: 1, name: 'NZ overtime'}, 
        {id: 2, name: 'AUS ordinary hours'}, 
        {id: 3, name: 'AUS overtime'} 
    ]
}
export default Data; 