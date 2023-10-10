import * as React from 'react'

function Login() {
    // 这里维护了一个组件自身的状态
    const [state, setState] = React.useReducer((s, a) => ({ ...s, ...a }), {
        resolved: false,
        loading: false,
        error: null,
    })

    function handleSubmit(event) {
        event.preventDefault()
        const { usernameInput, passwordInput } = event.target.elements

        setState({ loading: true, resolved: false, error: null })

        window
            .fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value,
                }),
            })
            .then(r => r.json().then(data => (r.ok ? data : Promise.reject(data))))
            .then(
                user => {
                    setState({ loading: false, resolved: true, error: null })
                    window.localStorage.setItem('token', user.token)
                },
                error => {
                    setState({ loading: false, resolved: false, error: error.message })
                },
            )
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usernameInput">Username</label>
                    <input id="usernameInput" />
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <input id="passwordInput" type="password" />
                </div>
                <button type="submit">Submit{state.loading ? '...' : null}</button>
            </form>
            {state.error ? <div role="alert">{state.error}</div> : null}
            {state.resolved ? (
                <div role="alert">Congrats! You're signed in!</div>
            ) : null}
        </div>
    )
}

export default Login
