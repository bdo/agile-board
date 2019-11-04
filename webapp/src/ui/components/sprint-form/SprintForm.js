import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'

const SprintForm = ({ sprint, onSave, onClose }) => {
    const [name, setName] = useState(sprint.name)
    const [loading, setLoading] = useState(false)

    const onSubmit = useCallback(
        e => {
            setLoading(true)
            e.preventDefault()
            onSave({ ...sprint, name })
        },
        [sprint, name, onSave]
    )

    const onChangeState = useCallback(
        state => {
            onSave({ ...sprint, state })
        },
        [sprint, onSave]
    )

    return (
        <Dialog isOpen onClose={onClose} backdropProps={{ className: 'sprint-form-backdrop' }} usePortal={false}>
            <div className={Classes.DIALOG_BODY}>
                <form className="sprint-form" onSubmit={onSubmit}>
                    <FormGroup label="Sprint name" labelFor="sprint-name">
                        <InputGroup id="sprint-name" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Sprint 1" />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" loading={loading} intent={Intent.PRIMARY}>
                            Save
                        </Button>
                        {sprint.state === 'open' && (
                            <Button loading={loading} intent={Intent.PRIMARY} minimal onClick={onChangeState.bind(this, 'active')}>
                                Activate
                            </Button>
                        )}
                        {sprint.state === 'active' && (
                            <Button loading={loading} intent={Intent.PRIMARY} minimal onClick={onChangeState.bind(this, 'close')}>
                                Close
                            </Button>
                        )}
                        {sprint.state === 'close' && (
                            <Button loading={loading} intent={Intent.PRIMARY} minimal onClick={onChangeState.bind(this, 'open')}>
                                Reopen
                            </Button>
                        )}
                    </FormGroup>
                </form>
            </div>
        </Dialog>
    )
}

SprintForm.propTypes = {
    sprint: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}

export default SprintForm
