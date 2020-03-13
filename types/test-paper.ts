
interface editData_Type {
    testpaperId?: number,
    testpaperName: string,
    courseId: number,
    diffculty: number,
    labels: string,
    usedCount: number,
    problemIds?: string,
    onlyChoiceIds?: string,
    multifyChoiceIds?: string,
    listenIds?: string,
    writeIds?: string,
    type: 0 | 1,
    onlyChoiceNum?: number,
    multifyChoiceNum?: number,
    listenNum?: number,
    writeNum?: number,
    teacherId?: number,
    createTime: string,
    creatorId: number
}
interface queryData_Type {
    testpaperId: number,
    testpaperName: string,
    creatorId: number,
    diffculty: number,
    labels: string
}
interface State {
    queryData: queryData_Type,
    editData: editData_Type,
    tableData: any[],
    dialogTitle: string,
    dialogVisible: boolean
}

export { State, queryData_Type, editData_Type };