import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../../button'
import { addressSummary } from '../../../util'
import Identicon from '../../identicon'
import genAccountLink from '../../../../lib/account-link'

class ConfirmRemoveAccount extends Component {
  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    removeAccount: PropTypes.func.isRequired,
    identity: PropTypes.object.isRequired,
    network: PropTypes.string.isRequired,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  handleRemove () {
    this.props.removeAccount(this.props.identity.address)
      .then(() => this.props.hideModal())
  }

  renderSelectedAccount () {
    const { identity } = this.props
    return (
      <div className="modal-container__address">
        <div className="account_identicon">
          <Identicon
              address={identity.address}
              diameter={32}
              style={{'marginLeft': '10px'}}
          />
        </div>
        <div className="account_name">
            <span className="account_label">Name</span>
            <span className="account_value">{identity.name}</span>
        </div>
        <div className="account_address">
            <span className="account_label">Public Address</span>
            <span className="account_value">{ addressSummary(identity.address) }</span>
        </div>
        <div className="account_link">
          <a
            className="hw-account-list__item__link"
            href={genAccountLink(identity.address, this.props.network)}
            target={'_blank'}
            title={this.context.t('etherscanView')}
          >
            <img src="images/popout.svg" />
          </a>
        </div>
      </div>
    )
  }

  render () {
    const { t } = this.context

    return (
      <div className="modal-container">
        <div className="modal-container__content">
          <div className="modal-container__title">
            { `${t('removeAccount')}` }?
          </div>
            { this.renderSelectedAccount() }
          <div className="modal-container__description">
            { t('removeAccountDescription') }
            <a className="modal-container__link" rel="noopener noreferrer" target="_blank" href="https://consensys.zendesk.com/hc/en-us/articles/360004180111-What-are-imported-accounts-New-UI-">{ t('learnMore') }</a>
          </div>
        </div>
        <div className="modal-container__footer">
          <Button
            type="default"
            className="modal-container__footer-button"
            onClick={() => this.props.hideModal()}
          >
            { t('nevermind') }
          </Button>
          <Button
            type="secondary"
            className="modal-container__footer-button"
            onClick={() => this.handleRemove()}
          >
            { t('remove') }
          </Button>
        </div>
      </div>
    )
  }
}

export default ConfirmRemoveAccount
