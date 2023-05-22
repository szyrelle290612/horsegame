import React from "react";

class PopUpModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.show && (
                <>
                    <div className="bet_confirmation_screen" style={{ display: 'flex' }}>
                        <div className="popup-div">
                            {this.props.component}
                            {this.props.button2 ?
                                <div className="div-block-90 popup margin-top">
                                    <div className="_40 _w-48"><a data-w-id="a0b3cb42-e771-7b83-8819-3fc923e42cb9" onClick={() => this.props.handleShowModal()} className="btn_primary-2 block secondary w-button">Close</a></div>
                                    <div className="_40 _w-48"><a onClick={this.props.handleConfirm} className="btn_primary-2 block w-button">{this.props.confirmLabel}</a></div>
                                </div>
                                :
                                <div data-w-id="57234d65-ff77-94f5-e75c-55309003a50f" class="close_popup_icon-2" onClick={() => this.props.handleShowModal()}>
                                    <img src="https://assets.website-files.com/623844b9c48492f6b2d6d1c3/623899e2561cce52ab22b3ea_close_icon.svg" loading="lazy" alt="" />
                                </div>
                            }

                        </div>
                    </div>


                </>
            )
        );
    }
}

export default PopUpModal;
