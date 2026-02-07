import Image from "next/image";

import { Modal } from '@/app/components/modal'


// TODO: dynamically fetch existing information
export default async function Project() {
  return (
    <Modal>
      <div>
        <h1>Whoops</h1>
        <p>{`Looks there isn't any information for this one yet :<`}</p>
      </div>
    </Modal>
  )
}

