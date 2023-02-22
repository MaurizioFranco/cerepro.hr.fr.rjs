import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import * as Constants from '../../constants';
//import AddCandidateState from './AddCandidateState';
//import * as Commons from '../../commons';

function CandidateStatesList() {
  const [candidateStates, setCandidateStates] = useState([]);

  function CustomColorCell(props) {
	const { value } = props;
	return <div style={{ backgroundColor: value, height: "100%", width: "100%" }} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        Constants.FULL_CANDIDATE_STATES_API_URI,
        {
          headers: {
            Authorization: 'Basic ' + btoa('9@9.9:9'),
          },
        }
      );
      const data = await response.json();
      setCandidateStates(data);
    };
    fetchData();
  }, []);

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
	  width: 42,
    },
	// {
	//   Header: 'Role ID',
	//   accessor: 'roleId',
	//   width: 59,
	// },
	  {
	  Header: 'Status Code',
	  accessor: 'statusCode',
	  width: 90,
	  },
    {
      Header: 'Status Label',
      accessor: 'statusLabel',
    },
    {
      Header: 'Status Description',
      accessor: 'statusDescription',
    },
    {
	  Header: 'Status Color',
	  accessor: 'statusColor',
	  Cell: CustomColorCell,
	  width: 100,
	  },
  ];

  return (
    <div style={{ margin: '20px'}}>
    <ReactTable 
	    data={candidateStates} 
	    columns={columns}
	    defaultPageSize={13}
	    style={{ fontSize: '15px' }}
	    getTrProps={(state, rowInfo, column, instance) => {
			return {
		    	style: {
			    backgroundColor: rowInfo && rowInfo.index % 2 === 0 ? '#efefef' : '#fff'
		   		}
			}
	    }}/>
    </div>
  );
}

//export default CandidateStatesList ;
export default withRouter(CandidateStatesList)