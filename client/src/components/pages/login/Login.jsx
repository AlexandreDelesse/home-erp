import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import UserContext from "../../../contexts/User.context";
import useGetUsers from "../../../hooks/query/users/useGetUsers";
import { saveUserSession } from "../../../services/user.service";

export default function Login() {
  const users = useGetUsers();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handlOnUserClick = (user) => {
    setUser(user);
    navigate(`/`);
  };

  if (users.isLoading) return <>Loading</>;
  if (users.isError) return <>Error</>;
  return (
    <div className="h-100 d-flex flex-column justify-content-center ">
      <ListGroup flush>
        {users.data.map((user) => (
          <ListGroupItem
            key={user.id}
            onClick={() => handlOnUserClick(user)}
            className="text-center py-3 bg-transparent table-hover fs-1"
            action
          >
            {user.name || "No name"}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
