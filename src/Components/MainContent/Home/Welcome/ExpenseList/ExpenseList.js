import { Row ,Col} from "react-bootstrap";

export default (props) => {
    const item=props.item;
  return (
    <>
      <tr>
        <td>{item.amount}</td>
        <td>{item.description}</td>
        <td>{item.category}</td>
      </tr>
    </>
  );
};
