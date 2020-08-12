import React, { MouseEvent, useState, useEffect } from "react";
//import {fetchComponent} from '../clientApi/fetchComponent';
import { Card, Button, Image, ListGroupItem, ListGroup } from "react-bootstrap";
import Popup from "./Popup";

export interface ProfileProps {
	userProfileName: string;
	userProfileRole: string;
	userProfileCountry: string;
	isEditEnabled: boolean;
	file: any;
}

const ProfileCard: React.FC<ProfileProps> = (props) => {
	const [imgurl, setImageUrl] = useState(
		"https://i.stack.imgur.com/YQu5k.png"
	);
	const [popup, setPopup] = useState({
		modalShow: false,
		title: "",
		message: "",
	});
	const [editableClass, setEditableClass] = useState("childContainer");

	const uploadFiles = (file: any) => {
		var fd = new FormData();
		if (file[0]) {
			let size = file[0].size / 1000000;
			let filetype = file[0].type;
			let ispng = filetype.indexOf("png") > -1;
			let isjpg = filetype.indexOf("jpeg") > -1;
			if (size < 1 && (ispng || isjpg)) {
				fd.append("recfile", file[0]);
			} else {
				setPopup({
					modalShow: true,
					title: "Info",
					message: "Please upload only image files of 1MB",
				});
				return false;
			}
		}
	};

	const handleSelect = (event: any) => {
		event.preventDefault();
		const fileInput = document.querySelector(
			"input#transfer-file"
		) as HTMLElement;
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleFiles = (e: any) => {
		uploadFiles(e.target.files);
	};

	useEffect(() => {
		if (props.isEditEnabled) {
			setEditableClass(() => "childContainer profileReadOnly");
		} else {
			setEditableClass(() => "childContainer");
		}
	}, [props.isEditEnabled]);

	return (
		<div className={editableClass}>
			<Card className="card text-center w-75">
				<Card.Body>
					<Image
						id="profilepic"
						src={imgurl}
						alt="laugh"
						roundedCircle
					/>
					<ListGroup className="list-group-flush borderless">
						<ListGroupItem className="borderless h5">
							{props.userProfileName}
						</ListGroupItem>
						<ListGroupItem className="borderless">
							{props.userProfileRole}
						</ListGroupItem>
						<ListGroupItem className="borderless">
							{props.userProfileCountry}
						</ListGroupItem>
					</ListGroup>
					{!props.isEditEnabled && (
						<div>
							<input
								style={{ display: "none" }}
								id="transfer-file"
								type="file"
								multiple
								onChange={(e) => handleFiles(e)}
							/>
							<Button
								variant="outline-primary"
								onClick={(e: MouseEvent<HTMLInputElement>) =>
									handleSelect(e)
								}
							>
								Upoad Photo
							</Button>
						</div>
					)}
				</Card.Body>
			</Card>
			<Popup
				show={popup.modalShow}
				onHide={() =>
					setPopup({ modalShow: false, title: "", message: "" })
				}
				title={popup.title}
				message={popup.message}
			/>
		</div>
	);
};

export default ProfileCard;