
interface editData_Type {
    courseName: string,
    labels: string,
    teacherIds: string,
    money: number,
    businessId: number,
    creatorId: number,
    createTime: string,
    courseId?: number,
    image_src: string,
    managerId: number,
    introduceInfo: string
}
interface queryData_type {
    courseId: number,
    courseName: string,
    creatorId: number
}
interface State {
    queryData: queryData_type,
    editData: editData_Type,
    tableData: any[],
    dialogVisiabel?: boolean,
    dialogTitle?: string,
    loading?: boolean
}

export { State, queryData_type, editData_Type };