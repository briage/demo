interface queryData_Type {
    subcourseId: number,
    subcourseName: string,
    courseId: number,
    creatorId: number
}
interface editData_type {
    subcourseName: string,
    courseId: number,
    video_src: string,
    index: number,
    teacherId: number,
    creatorId?: number,
    createTime?: string,
    subcourseId?: number
}
interface State {
    queryData: queryData_Type,
    editData: editData_type,
    tableData: any[],
    dialogTitle: string,
    dialogVisible: boolean,
    loading: boolean,
    fileList: any[]
}

export { State, queryData_Type, editData_type };