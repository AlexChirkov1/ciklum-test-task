let data = {
    rowTitle: ['Name','Mon','Tue','Wed','Thu','Fri'],
    hours:["10","11","12","13","14","15","16","17","18"],
    days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    persons: ["Nick","Vadim","Gleb","Vasya","Petya"],
    saveData: (values,errorFn) => {

        let storage = JSON.parse(localStorage.getItem('data'))
        let hasMatch = storage.find((s) => {
            return (s.day === values.day) && (s.time === values.time)
        })

        if(!!hasMatch) {
            errorFn()
            return
        }

        storage.push(values)
        localStorage.setItem("data", JSON.stringify(storage))
        location.href = "/";
    }

}
export default data