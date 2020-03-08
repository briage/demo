import * as React from 'react';
import _ from 'lodash';
import { Modal, Input, Table, Icon } from 'antd';
import { Form } from '../form-components/form';

export interface GridOptionsItem {
    key: string,
    dataIndex: string,
    title: string,
    render?: (...args: any[]) => any | JSX.Element
}

export interface GridProps {
    gridOptions: GridOptionsItem[],
    tableData: any[],
    onFetchContent: (e?: React.FormEvent) => void,
    searchRender: () => React.ReactNodeArray,
    handleSearchChange: (e) => void,
    searchButtonExact?: () => React.ReactNodeArray,
    dialogContentRender?: () => React.ReactNodeArray | React.ReactNode,
    onDialogFormSubmit?: () => void,
    dialogVisable?: boolean,
    onCloseDialog?: () => void,
    dialogTitle?: string
}

const { useEffect } = React;

function Grid(props: GridProps) {
    let { searchRender, onFetchContent, searchButtonExact, gridOptions, 
        dialogContentRender, onDialogFormSubmit, tableData, handleSearchChange,
        dialogVisable, onCloseDialog, dialogTitle } = props;
    dialogVisable = !!dialogVisable;
    return (
        <>
            {
                dialogContentRender && <Modal
                    visible={dialogVisable}
                    onOk={onDialogFormSubmit}
                    onCancel={onCloseDialog}
                    title={ dialogTitle ? dialogTitle : '创建' }
                    okText='保存'
                >
                    { dialogContentRender() }
                </Modal>
            }
            <Form className='' onChange={handleSearchChange} onSubmit={onFetchContent}>
                <div className='search-form'>
                        { searchRender() }
                </div>
                <div className='search-button'>
                    <Input className='query-button' type='submit' value='查询' />
                    { searchButtonExact && searchButtonExact() }
                </div>
            </Form>
                
            <div className='grid-table'>
                <Table columns={gridOptions} rowKey={(record, index) => `row${index}`} dataSource={tableData} />
            </div>
        </>
    )
}

export { Grid };