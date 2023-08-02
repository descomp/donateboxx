import { useState } from 'react'
import axios from "axios";
import { Outlet } from "react-router-dom";

import pattern from '../images/pattern2.webp';

import Navbar from '../Navbar';
import Footer from '../Footer';

export default function Layout() {

    // todo "lift state up" again out of Layout...?
    const [loginData, setLoginData] = useState(null)

    function _updateFeedbackZone(status, message = null) {
        const feedback = document.querySelector("#feedback-zone")
        if (!status) {
            // clear
            feedback.className = ""
            feedback.textContent = ""
        } else if (status === "error") {
            feedback.className = "alert alert-danger"
            feedback.textContent = message
        } else if (status === "message") {
            feedback.className = "alert alert-success"
            feedback.textContent = message
        }
    }

    function _commonCatchResponse(resp) {
        const res = resp.response
        if (res) {
            console.log(res, res.status)
            if (res.data.error) {
                console.log("error", res.data.error)
                _updateFeedbackZone("error", res.data.error)
            }
            // todo can rmeove this bit & refactor post-testing
            if (res.data.message) {
                console.error("message found in .catch clause unexpectedly", res.data.message)
                _updateFeedbackZone("error", res.data.message)
            }
        }
    }
    function loginRequest({ username, password, email, phone }) {
        // This overloaded loginRequest is bad juju, but if I could at least deduplicate, elegant
        let payload = { username, password }
        if (email || phone) {
            payload = { email, phone, ...payload }
            return axios.post("/create_user", payload)
                .then((response) => {
                    console.log(response)
                    const res = response.data
                    setLoginData(({
                        username: res.username,
                        email: res.email,
                        phone: res.phone,
                    }))

                    if (response.data.message)
                        _updateFeedbackZone("message", response.data.message)
                    else
                        _updateFeedbackZone(null)
                }).catch((error) => {
                    _commonCatchResponse(error)
                    setLoginData(null)
                })
        }
        return axios.post("/login", payload)
            .then((response) => {
                const res = response.data
                console.log({ response })
                setLoginData(({
                    username: res.username,
                    phone: res.phone,
                    email: res.email,
                }))
                if (response.data.message)
                    _updateFeedbackZone("message", response.data.message)
                else
                    _updateFeedbackZone(null)
            }).catch((error) => {
                _commonCatchResponse(error)
                // make sure they aren't logged in as some dummy data somehow
                setLoginData(null)
            })
    }

    function logoutRequest() {
        axios({
            method: "POST",
            url: "/logout",
        }).then((response) => {
            console.debug("logout", response)
            if (response?.data?.message)
                _updateFeedbackZone("message", response.data.message)
        }).catch((error) => {
            _commonCatchResponse(error)
        }).finally(() => {
            // log them out in errors anyway
            setLoginData(null)
        })
    }

    // @ref CREATE TABLE IF NOT EXISTS donations(amount REAL not null, name TEXT not null, email TEXT, phone TEXT, note TEXT)
    function donateRequest({ amount, name, email = null, phone = null, note = '' }) {
        const payload = { amount, name, email, phone, note };
        axios.post("/donate", payload).then((response) => {
            if (response?.data) {
                console.debug("donate", response.data)
                if (response.data.message)
                    _updateFeedbackZone("message", response.data.message)
            }
        }).catch((error) => {
            _commonCatchResponse(error);
        })
    }

    // @ref username TEXT not null, email TEXT not null, phone TEXT, personable BOOLEAN DEFAULT FALSE, organized BOOLEAN DEFAULT FALSE, note TEXT)
    function volunteerRequest({ username, email, phone = null, personable = false, organized = false, note = '' }) {
        const payload = { username, email, phone, personable, organized, note };
        axios.post("/volunteer", payload).then((response) => {
            // todo refactor to extract repeated code.
            if (response?.data) {
                console.debug("volunteer", response.data)
                if (response.data.message)
                    _updateFeedbackZone("message", response.data.message)
            }
        }).catch((error) => {
            _commonCatchResponse(error);
        })
    }

    return (
        <div id="layout" style={{ backgroundImage: `url(${pattern})` }}>
            {/* adding the common navbar */}
            {/* TODO reuse context format recommended online to navbar */}
            <Navbar loginData={loginData} setLoginData={setLoginData} loginRequest={loginRequest} logoutRequest={logoutRequest} />
            {/* alternating page contents in Outlet */}
            <Outlet context={{ loginData, setLoginData, loginRequest, logoutRequest, donateRequest, volunteerRequest }} />
            <Footer />
        </div>
    );
}
