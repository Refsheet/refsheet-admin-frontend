import React, { useState } from 'react'
import { Row, Modal, Button, Icon, Textarea } from 'react-materialize'

import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
const BAN_USER = loader('../../../graphql/banUser.graphql')

const BanButton = ({ user }) => {
  const [reason, setReason] = useState('')

  const [banUser, { data, loading, error }] = useMutation(BAN_USER)

  const updateReason = (e) => {
    e.preventDefault()
    setReason(e.target.value)
  }

  const submit = (e) => {
    e.preventDefault()
    console.log({ id: user.id, reason })

    banUser({
      variables: {
        id: user.id,
        reason,
      },
    })
      .then(console.log)
      .catch(console.error)
  }

  const banButton = (
    <Button
      className={'red darken-1'}
      node={'button'}
      onClick={submit}
      disabled={loading}
    >
      {loading ? 'Getting Yote' : 'Yeetus Spageetus'}
    </Button>
  )

  const close = (
    <Button modal={'close'} node={'button'} disabled={loading}>
      Nevermind
    </Button>
  )

  const initiate = (
    <Button className={'red darken-1 block'}>
      <Icon left>block</Icon>
      Ban User
    </Button>
  )

  return (
    <Modal
      header={'Confirm User Ban'}
      id={'confirm_user_ban'}
      trigger={initiate}
      actions={[close, banButton]}
    >
      <form onSubmit={submit}>
        <p>
          If you are so inclined, you may provide a reason for this ban here.
        </p>
        <Row>
          <Textarea
            s={12}
            label={'Leave a Happy Little Ban Message'}
            onChange={updateReason}
            value={reason}
            disabled={loading}
          />
        </Row>
      </form>
    </Modal>
  )
}

export default BanButton
