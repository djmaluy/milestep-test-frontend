import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export const TaskDetail = ({showTask}) => {
  return (
     <Card key = {showTask.id} style={{maxWidth: "600px", marginTop:"20px"}}>
      <CardContent>
        <Typography  color="textPrimary" variant='h2'>
          <span>Title: </span>{showTask.title}
        </Typography >
        <Typography  color="textSecondary" variant='h4'>
          <span>Description: </span>{showTask.description}
        </Typography>
        <Typography color="textSecondary" variant='h4'>
          <span>Priority: </span>{showTask.priority}
        </Typography>
        <Typography color="textSecondary" variant='h4'>
          <span>Due_date: </span>{showTask.due_date}
        </Typography>
      </CardContent>
    </Card>
  ) 
}
