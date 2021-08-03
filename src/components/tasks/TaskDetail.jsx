import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GetAppIcon from "@material-ui/icons/GetApp";

export const TaskDetail = React.memo(({ showTask }) => {
  return (
    <Card key={showTask.id} className="taskDetail">
      <CardContent className="taskDetail__content">
        <Typography color="textPrimary" variant="h2">
          <span>Title: </span>
          {showTask.title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h4"
          style={{ marginTop: "15px" }}
        >
          <span>Description: </span>
          {showTask.description}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h4"
          style={{ marginTop: "15px" }}
        >
          <span>Priority: </span>
          {showTask.priority}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h4"
          style={{ marginTop: "15px" }}
        >
          <span>Due_date: </span>
          {showTask.due_date}
        </Typography>
        <Typography style={{ marginTop: "15px" }} variant="h5">
          <a
            href={showTask.some_file.pdf}
            target="_blank"
            rel="noreferrer"
            className="download__link"
          >
            <GetAppIcon fontSize="large" />
            <span>Download</span>
          </a>
        </Typography>
      </CardContent>
    </Card>
  );
});
