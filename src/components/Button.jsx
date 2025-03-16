import { Button } from "@mui/material"

export default function ButtonFn({label, isdisable, onClickHandler, keepTextCase}){
    return <Button 
        disabled={isdisable} 
        onClick={onClickHandler} 
        variant="outlined"
        sx={{ 
            textTransform: keepTextCase ? 'none' : 'uppercase',
            borderRadius: '8px',
            padding: '8px 16px',
            borderWidth: '1px',
            backgroundColor: isdisable ? 'rgba(33, 150, 243, 0.15)' : 'transparent',
            borderColor: '#2196f3',
            color: '#2196f3',
            boxShadow: isdisable ? '0 0 10px rgba(33, 150, 243, 0.3)' : 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
                borderColor: '#90caf9',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(33, 150, 243, 0.3)',
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
            }
        }}
    >
        {label}
    </Button>
}