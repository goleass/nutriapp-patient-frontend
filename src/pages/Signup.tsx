import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider/useAuth';

// import AuthImage from '../images/auth-image-nutrition-01.jpg';

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [setedEmail, setSetedEmail] = useState(true)
  const [setedPassword, setSetedPassword] = useState(true)
  const [authenticated, setAuthenticated] = useState(true)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const auth = useAuth()
  const navigate = useNavigate();

  const handleEmail = (e: any) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: any) => {
    setPassword(e.target.value)
  }

  const handleRegister = async (e: any) => {
    try {
      e.preventDefault()
      setLoading(true)

      if (email) setSetedEmail(true)
      else {
        setSetedEmail(false)
        return
      }

      if (password) setSetedPassword(true)
      else {
        setSetedPassword(false)
        return
      }

      const authenticated = await auth.registrate(email, password)

      setAuthenticated(authenticated)

      if (authenticated) navigate('/')

    } catch (error) {
      if(error && error.response && error.response.data && error.response.data.error && error.response.data.error === "Paciente ainda não cadastrado pelo nutricionista.")
        setError("Paciente ainda não cadastrado pelo nutricionista.")
      console.log(error.response.data.error)
    }finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  <div className="text-2xl font-bold mt-1 text-black-500">NutriApp Paciente</div>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8">
              <h1 className="text-3xl text-gray-800 font-bold mb-6">Cadastrar nova conta</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  {error && <div className="text-sm mt-1 text-red-500">{error}</div>}
                  {!authenticated && <div className="text-sm mt-1 text-red-500">Usuário já existe.</div>}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                    <input onChange={handleEmail} value={email} id="email" className="form-input w-full" type="email" />
                  </div>
                  {!setedEmail && <div className="text-xs mt-1 text-red-500">Preencha esse campo!</div>}
                  {/* <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="role">Your Role <span className="text-red-500">*</span></label>
                    <select id="role" className="form-select w-full">
                      <option>Designer</option>
                      <option>Developer</option>
                      <option>Accountant</option>
                    </select>
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input onChange={handlePassword} value={password} id="password" className="form-input w-full" type="password" autoComplete="on" />
                  </div>
                  {!setedPassword && <div className="text-xs mt-1 text-red-500">Preencha esse campo!</div>}
                </div>
                <div className="flex items-center justify-end mt-6">
                  <button disabled={loading} onClick={handleRegister} type="submit" className="disabled:opacity-75 disabled:bg-indigo-600 btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">
                    {loading && <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth-="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}

                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                  </button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-200">
                <div className="text-sm">
                  Já possui uma conta? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/signin">Entrar</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        {/* <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
        </div> */}

      </div>

    </main>
  );
}

export default Signup;