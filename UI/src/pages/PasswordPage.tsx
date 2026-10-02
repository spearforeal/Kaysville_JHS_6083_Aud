import { useState } from 'react'

const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const MAX_PASSCODE_LENGTH = 8

interface PasswordPageProps {
  onAuthorized: () => void
  onBack: () => void
  onSubmit: (passcode: string) => boolean
}

export function PasswordPage({
  onAuthorized,
  onBack,
  onSubmit,
}: PasswordPageProps) {
  const [passcode, setPasscode] = useState('')
  const [isIncorrect, setIsIncorrect] = useState(false)

  const appendDigit = (digit: string) => {
    setIsIncorrect(false)
    setPasscode((current) =>
      current.length < MAX_PASSCODE_LENGTH ? current + digit : current,
    )
  }

  const clearPasscode = () => {
    setPasscode('')
    setIsIncorrect(false)
  }

  const submitPasscode = () => {
    if (onSubmit(passcode)) {
      clearPasscode()
      onAuthorized()
      return
    }

    setPasscode('')
    setIsIncorrect(true)
  }

  return (
    <main className="password-page">
      <header className="password-header">
        <button className="back-button" onClick={onBack} type="button">
          <span aria-hidden="true">←</span> Back
        </button>
        <div>
          <p className="page-kicker">Kaysville Junior High</p>
          <h1 aria-live="polite">
            {isIncorrect ? 'Incorrect passcode' : 'Enter passcode'}
          </h1>
        </div>
        <span aria-hidden="true" />
      </header>

      <section className="keypad" aria-label="Passcode keypad">
        <output
          className="passcode-display"
          aria-label={`${passcode.length} digits entered`}
        >
          {passcode.length === 0 ? '—' : '•'.repeat(passcode.length)}
        </output>

        <div className="keypad-grid">
          {NUMBER_KEYS.map((number) => (
            <button
              className="keypad-button"
              key={number}
              onClick={() => appendDigit(number)}
              type="button"
            >
              {number}
            </button>
          ))}
          <button
            className="keypad-button keypad-action"
            onClick={clearPasscode}
            type="button"
          >
            Clear
          </button>
          <button
            className="keypad-button"
            onClick={() => appendDigit('0')}
            type="button"
          >
            0
          </button>
          <button
            className="keypad-button keypad-enter"
            disabled={passcode.length === 0}
            onClick={submitPasscode}
            type="button"
          >
            Enter
          </button>
        </div>
      </section>
    </main>
  )
}
