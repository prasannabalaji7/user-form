import React, { useState } from 'react';
import classNames from 'classnames';
import { Card, Image, ListGroupItem, ListGroup } from 'react-bootstrap';
import Popup from './Popup';
import { popupMessage, imgUrl } from '../constants/Constants';

export interface ProfileProps {
	userProfileName: string;
	userProfileRole: string;
	userProfileCountry: string;
	isEditBtnVisible: boolean;
}

const ProfileCard: React.FC<ProfileProps> = (props) => {
	const [popup, setPopup] = useState(popupMessage);
	const { isEditBtnVisible, userProfileName, userProfileCountry, userProfileRole } = props;
	const editableClass = classNames('childContainer', {
		profileReadOnly: isEditBtnVisible,
	});

	return (
		<div className={editableClass}>
			<Card className='card text-center w-75'>
				<Card.Body>
					<Image
						id='profilepic'
						src={imgUrl}
						alt='laugh'
						roundedCircle
					/>
					<ListGroup className='list-group-flush borderless'>
						<ListGroupItem className='borderless h5'>
							{userProfileName}
						</ListGroupItem>
						<ListGroupItem className='borderless'>
							{userProfileRole}
						</ListGroupItem>
						<ListGroupItem className='borderless'>
							{userProfileCountry}
						</ListGroupItem>
					</ListGroup>
				</Card.Body>
			</Card>
			<Popup
				show={popup.modalShow}
				onHide={() =>
					setPopup({ modalShow: false, title: '', message: '' })
				}
				title={popup.title}
				message={popup.message}
			/>
		</div>
	);
};

export default ProfileCard;