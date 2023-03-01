import { v4 as uuid } from 'uuid';
  
export default function generator() {

  const unique_id = uuid();
  const id = unique_id.slice(0,8);
  //console.log(ID);
  return (
      id
  );
}