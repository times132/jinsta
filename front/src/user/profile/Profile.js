import React, { Component } from 'react';
import { getUserProfile } from '../../util/APIUtils';
import {Form, Avatar, Tabs, Upload, Button, message} from 'antd';
import { UserOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';
import LoadingIndicator  from '../../common/LoadingIndicator';
import './Profile.css';

const TabPane = Tabs.TabPane;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Profile extends Component{
    _isMounted = false;
    constructor(props) {
        console.log("profile constructor")
        super(props);
        this.state = {
            user: {
                id: 0,
                username: props.match.params.username,
                introduce: "",
                profileImage: ""
            },
            // isLoading: false
        }
    }

    // loadUserProfile = (username) => {
    //     this.setState({
    //         isLoading: true
    //     });
    //     getUserProfile(username)
    //         .then(response => {
    //             this.setState({
    //                 user: response,
    //                 isLoading: false
    //             });
    //         }).catch(error => {
    //         if(error.status === 401) {
    //             this.setState({
    //                 isLoading: false
    //             });
    //         } else {
    //             this.setState({
    //                 isLoading: false
    //             });
    //         }
    //     });
    // }

    loadUserProfile = (username) => {
        this._isMounted = true
        getUserProfile(username)
            .then(response => {
                this.setState({
                    user: response,
                });
                this._isMounted = false
            }).catch(error => {
            if(error.status === 401) {
                this._isMounted = false
            } else {
                this._isMounted = false
            }
        });
    }

    componentDidMount() {
        this._isMounted = true;
        console.log("profile conponentdidmount")
        console.log(this.props)
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
        console.log(this.state.user)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("profile conponentdidupdate")
        if(this.props.match.params.username !== prevProps.match.params.username) {
            this.loadUserProfile(this.props.match.params.username);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        console.log("profile render")
        if(this._isMounted) {
            return <LoadingIndicator />;
        }

        let followcheck;
        if(this.props.currentUser === null || this.props.currentUser.username !== this.state.user.username){
            followcheck = <Button>팔로우</Button>
        }else{
            followcheck = <Button>프로필 편집</Button>
        }
        // const uploadButton = (
        //     <div>
        //         {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        //         <div className="ant-upload-text">Upload</div>
        //     </div>
        // );
        // const { imageUrl } = this.state;
        return (
            <div className="profile">
                {
                    this.state.user ? (
                        <div className="profile__header">
                            <div className="avatar__container">
                                {/*<Upload*/}
                                {/*    name="avatar"*/}
                                {/*    listType="picture-card"*/}
                                {/*    className="avatar-uploader"*/}
                                {/*    showUploadList={false}*/}
                                {/*    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                                {/*    beforeUpload={beforeUpload}*/}
                                {/*    onChange={this.handleChange}*/}
                                {/*>*/}
                                {/*    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}*/}
                                {/*</Upload>*/}
                                <form id="frm_profile_img" action="/api/user/profileUpload" method="post" encType="multipart/form-data">
                                    <input type="file" name="profileImage" style={{display: "none"}}/>
                                </form>
                                <img id="profile_image" src="/uplaod/{this.state.user.profileImage}" onError={(e) => {e.target.onerror = null; e.target.src="/image/avatar.jpg"}}/>
                            </div>

                            <div className="profile__info">
                                <div className="profile__title">
                                    <h1>{this.state.user.username}</h1>

                                    <div id="follow_check">
                                        {followcheck}
                                    </div>
                                </div>



                            </div>
                        </div>
                    ): console.log("없어")
                }
            </div>
        );
    }


}

export default Profile;