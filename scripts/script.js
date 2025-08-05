let typingArea = document.getElementById("typing_area");
let history = document.getElementById("history");
let buttons = Array.from(document.getElementsByClassName("button"));
typingArea.innerText = "0";
buttons.map((button) => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "C":
        typingArea.innerText = "0";
        const storedHistory = JSON.parse(
          localStorage.getItem("history") || "[]"
        );
        history.innerText = storedHistory.join("\n");
        localStorage.removeItem("history");
        break;
      case "⟵":
        if (typingArea.innerText === "Error!") {
            typingArea.innerText = "0";
          } else {
            let newText = typingArea.innerText.slice(0, -1).trim(); // Trim any spaces
            typingArea.innerText = newText.length > 0 ? newText : "0";
          }
        break;
      case "=":
        try {
          const expression = typingArea.innerText;

          if (!expression || /[+\-*/.]$/.test(expression)) {
            typingArea.innerText = "Error!";
            return;
          }

          const result = new Function("return " + expression)();

          if (typeof result !== "number" || isNaN(result)) {
            typingArea.innerText = "Error!";
          } else {
            const rounded = Number(result.toFixed(1));
            typingArea.innerText = rounded;

            let rawHistory = localStorage.getItem("history");
            let oldHistory;

            try {
              oldHistory = JSON.parse(rawHistory);
              if (!Array.isArray(oldHistory))
                throw new Error("History not array");
            } catch {
              oldHistory = [];
            }
            oldHistory.push(`${expression} = ${rounded}`);
            localStorage.setItem("history", JSON.stringify(oldHistory));
          }
        } catch (err) {
          console.error("Evaluation error:", err);
          typingArea.innerText = "Error!";
        }
        break;

      default:
        const isOperator = /[+\-*/]/.test(e.target.innerText);
        const isDigit =
          /\d/.test(e.target.innerText) || e.target.innerText === ".";

        if (typingArea.innerText === "Error!") {
          typingArea.innerText = "0";
        }

        if (typingArea.innerText === "0" && isDigit) {
          typingArea.innerText = e.target.innerText;
        } else if (typingArea.innerText === "0" && isOperator) {
          typingArea.innerText += e.target.innerText;
        } else {
          if (isOperator) {
            if (/[+\-*/]/.test(typingArea.innerText.slice(-1))) {
              typingArea.innerText =
                typingArea.innerText.slice(0, -1) + e.target.innerText;
            } else {
              typingArea.innerText += e.target.innerText;
            }
          } else {
            typingArea.innerText += e.target.innerText;
          }
        }
    }
  });
});
