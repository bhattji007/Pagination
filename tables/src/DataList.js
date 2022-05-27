import React,{useState,useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory,{ textFilter} from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

function DataList() {
    const [userList, setUserList ]=useState([]);

    const columns= [
        {dataField:'id',text:'Id',sort:true},
        {dataField:'first_name',text:'First Name', sort:true, filter:textFilter()},
        {dataField:'last_name',text:'Last Name',sort:true},
        {dataField:'email',text:'E-mail'},
        {dataField:'web',text:'Website'}
    ]
    const pagination=paginationFactory({
        page:1,
        sizePerPage:15,
        lastPageText:'-->',
        firstPageText:'<--',
        nextPageText:'>',
        prePageText:'<',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange:function(page,sizePerPage){
            console.log('page',page);
            console.log('sizeperpage',sizePerPage);

        },
        onSizePerPageChange:function (page,sizePerPage) {
            console.log('page',page);
            console.log('sizePerPage',sizePerPage);
        }
    });


    useEffect(() => {
      
      fetch('https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json')
      .then(res=>res.json())
      .then(result=>setUserList(result))
      .catch(error=> console.log(error));
      return () => {
        
      }
    }, [])
  return (
    <div>
        <BootstrapTable 
        bootstrap4 
        keyField= 'id' 
        columns={columns} 
        data={userList}
        pagination={pagination}
        filter={ filterFactory() }
        />
    </div>
  )
}

export default DataList;