import { useEffect, useState } from "react";

const { default: Axios } = require("axios");

function Home() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    Axios.get("http://localhost:3003/get").then((res: any) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      {data.map((user) => (
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            {/* <td>{user.password}</td> */}
          </tr>
        </tbody>
      ))}
    </div>
  );
}

export default Home;
