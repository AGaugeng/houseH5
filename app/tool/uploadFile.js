import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import { UploadFile, UpdateFileCallbackA, UpdateFileCallbackB } from '../actions/house'
import { getUserInfo } from '../actions/user'
import { TouchableOpacity } from "react-native"
import { scaleSize } from "../screens/ScreenUtil"
import View from './View'
import Toast from '../tool/toast'
class Counter extends PureComponent {
    static propTypes = {
        getUserInfo: PropTypes.func.isRequired,
        UploadFile: PropTypes.func.isRequired,
        userinfo: PropTypes.object.isRequired,
    }
    static defaultProps = {
        userinfo: {},
    }
    state = {
        name: '',
        path_a: '',
        path_b: '',
        preview_a: null,
        preview_b: null,
        preview: [],
        data_a: null,
        data_b: null,
        data: [],
        path: [],
        file: []

    }

    // changeName = (e) => {
    //     this.setState({ name: e.target.value })
    // }
    changeName(file) {

        if (!file.length === 0) {
            return;
        }
        let src, preview = []
        for (var i = 0; i < file.length; i++) {
            let type = file[i].type;

            if (/^image\/\S+$/.test(type)) {

                src = URL.createObjectURL(file[i])
                preview[i] = <img width="110px" height="110px" src={src} alt='' />

            } else if (/^video\/\S+$/.test(type)) {

                src = URL.createObjectURL(file[i])
                preview[i] = <video src={src} loop controls />

            }
            this.setState({ path: [...this.state.path, file[i].name], preview: [...this.state.preview, ...preview] })
        }
    }
    changePath = (e) => {

        const file = e.target.files;
        // console.log(file)
        this.setState({ file: [...this.state.file, ...file] })
        // console.log(this.state.file)
        this.changeName(file)
    }
    upload = () => {
        let file = this.state.file
        // console.log(file)

        for (var i in file) {
            let type = file[i].type;

            if (/^image\/\S+$/.test(type)) {
                this.props.UploadFile([
                    { name: 'a[]', data: file[i] },
                    { name: 'type', data: 'image' }
                ], (data) => {
                    Toast.success("上传成功!")
                    // this.props.UpdateFileCallbackA(data.a)
                    this.props.UpdateFileCallbackA([...this.props.filecallbacka, data[0].file_id])
                }, (err) => {

                })
            } else if (/^video\/\S+$/.test(type)) {
                this.props.UploadFile([
                    { name: 'a[]', data: file[i] },
                    { name: 'type', data: 'video' }
                ], (data) => {
                    Toast.success("上传成功!")
                    // this.props.UpdateFileCallbackA(data.a)
                    this.props.UpdateFileCallbackA([...this.props.filecallbacka, data[0].file_id])

                }, (err) => {

                })
            }

        }

    }

    cancel = () => {
        this.setState({ preview: [], file: [] })
        this.props.UpdateFileCallbackA([])
        this.props.UpdateFileCallbackB([])
    }
    render() {

        const { preview } = this.state;
        // console.log(this.state.file)
        return (
            <div>
                <div className='row'>
                    <div className='media'>
                        {!preview[0] &&
                            <a href="javascript:;" className="file">
                                {/* <input type='file' accept='video/*,image/*' onChange={this.changePath} multiple /> */}
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[0]}

                    </div>

                    {!!preview[0] && <div className='media'>
                        {!preview[1] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[1]}
                    </div>}
                </div>
                <div className='row'>
                    {!!preview[1] && <div className='media'>
                        {!preview[2] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[2]}

                    </div>}
                    {!!preview[2] && <div className='media'>
                        {!preview[3] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[3]}
                    </div>}
                </div>
                <div className='row'>
                    {!!preview[3] && <div className='media'>
                        {!preview[4] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[4]}

                    </div>}
                    {!!preview[4] && <div className='media'>
                        {!preview[5] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[5]}
                    </div>}
                </div>
                <div className='row'>
                    {!!preview[5] && <div className='media'>
                        {!preview[6] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[6]}

                    </div>}
                    {!!preview[6] && <div className='media'>
                        {!preview[7] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[7]}
                    </div>}
                </div>
                <div className='row'>
                    {!!preview[7] && <div className='media'>
                        {!preview[8] &&
                            <a href="javascript:;" className="file">
                                <input type='file' onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[8]}

                    </div>}
                    {/* {!!preview[8] && <div className='media'>
                        {!preview[9] &&
                            <a href="javascript:;" className="file">
                                <input type='file'  onChange={this.changePath} multiple />
                            </a>
                        }
                        {preview[9]}
                    </div>} */}
                </div>

                <View row hcenter style={{ marginTop: scaleSize(50) }}>
                    <TouchableOpacity transparent onPress={this.upload}>
                        <button className='mine' style={{
                            borderRadius: scaleSize(10),
                            width: scaleSize(220),
                            height: scaleSize(60),
                            marginLeft: scaleSize(60),
                            marginRight: scaleSize(60),
                            color: '#fff'
                        }} >上传</button>
                    </TouchableOpacity>
                    <TouchableOpacity transparent onPress={this.cancel}>
                        <button className='mine' style={{
                            borderRadius: scaleSize(10),
                            width: scaleSize(220),
                            height: scaleSize(60),
                            marginLeft: scaleSize(60),
                            marginRight: scaleSize(60),
                            color: '#fff'
                        }}>取消</button>
                    </TouchableOpacity>
                </View>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userinfo: state.user.info,
    filecallbacka: state.house.filecallbacka,
    filecallbackb: state.house.filecallbackb,
    // area: state.location.area,

})

export default connect(mapStateToProps, { getUserInfo, UploadFile, UpdateFileCallbackA, UpdateFileCallbackB })(Counter)
