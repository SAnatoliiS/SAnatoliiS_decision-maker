import React from 'react';
import { Form, reduxForm, Field } from 'redux-form';
import Modal from 'react-modal';

class NewItem extends React.Component {
	state = {
		error: null
	};
	onAddItem = ({ title: inputTitle, info: inputInfo }) => {
		const title = inputTitle ? inputTitle.trim() : null;
		const info = inputInfo ? inputInfo.trim() : null;
		if (!!title) {
			this.setState({ error: null });
			this.props.addItem({ title, info });
			this.props.closeNewItemModal();
			this.props.reset();
		} else {
			this.setState({
				error: 'Title must contain at least one character (not a space)'
			});
		}
	};
	closeModal = e => {
		e.preventDefault();
		this.props.closeNewItemModal();
		setTimeout(() => {
			this.props.reset();
			this.setState({ error: null });
		}, 200);
	};
	render() {
		const { isNewItemModalOpen, handleSubmit } = this.props;
		return (
			<Modal
				isOpen={isNewItemModalOpen}
				onRequestClose={this.closeModal}
				contentLabel="What is your next option?"
				className="modal-common"
				closeTimeoutMS={200}
			>
				<div className="modal__header">New option</div>
				<Form className="modal__body" onSubmit={handleSubmit(this.onAddItem)}>
					<div className="new-item-modal__fields">
						<div>Title*:</div>
						<Field
							className="new-item-modal__title-field"
							name="title"
							component="input"
							type="text"
						/>
						<div className="new-item-modal__error">{this.state.error}</div>
						<div>Additional Info (not required):</div>
						<Field
							className="new-item-modal__info-field"
							name="info"
							component="input"
							type="text"
						/>
					</div>
					<div className="modal__buttons">
						<button className="btn-primary button" onClick={this.closeModal}>
							Cancel
						</button>
						<button className="btn-primary button" type="submit">
							Add
						</button>
					</div>
				</Form>
			</Modal>
		);
	}
}

Modal.setAppElement('body');

export default reduxForm({
	form: 'newItem'
})(NewItem);
