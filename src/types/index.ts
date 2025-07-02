//TS中的接口、泛型、自定义类型

//定义接口，用于限制某对象的具体属性
export interface PersonInte {
    id:string,
    name:string,
    age?:number //加上问号，表示使用的地方可以没有这个属性
}

//自定义类型，两种写法
//export type Persons = Array<PersonInte>
export type Persons = PersonInte[]