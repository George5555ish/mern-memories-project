import {makeStyles} from '@material-ui/core';


export default makeStyles(() => ({

    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
      },
      brandContainer: {
          display: 'flex', 
          flexDirection: 'row',
      },
      heading: {
        color: 'purple',
        textDecoration: 'none',
      },
      image: {
        marginLeft: '25px',
      },
      toolbar: {
          display: 'flex',
          justifyContent: 'flex-end',
          width: '400px',
      }, 
      profile: {
          display: 'flex',
      }
}));