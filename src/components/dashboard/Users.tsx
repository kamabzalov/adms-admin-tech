import { useEffect, useState } from "react";
import { listUsers } from "../../services/user.service";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    if (!loaded) {
      const listOfUsers = listUsers().then(
        (response) => {
          setUsers(response.data);
          setLoaded(true);
          return response.data;
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
  }, [users]);
  return (
    <>
      <h1 className="mb-5">Users</h1>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table
              id="kt_table_users"
              className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
            >
              <thead>
                <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0"></tr>
              </thead>
              <tbody className="text-gray-600 fw-bold">
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
