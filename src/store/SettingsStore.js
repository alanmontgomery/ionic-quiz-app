import { Store } from "pullstate";

const SettingsStore = new Store({

    categories: [
        {
            label: "Code",
            value: "code",
        },
        {
            label: "Linux",
            value: "linux"
        },
        {
            label: "Dev Ops",
            value: "devops"
        },
        {
            label: "Authentication",
            value: "authentication"
        },
        {
            label: "Bash",
            value: "bash"
        },
        {
            label: "SQL",
            value: "sql"
        }
    ],
    difficulties: [
        {
            label: "Easy",
            value: "easy"
        },
        {
            label: "Medium",
            value: "medium"
        },
        {
            label: "Hard",
            value: "hard"
        }
    ],

    chosenCategory: false,
    chosenDifficulty: false
});

export default SettingsStore;

export const updateChosenCategory = category => {

    SettingsStore.update(s => { s.chosenCategory = category });
}

export const updateChosenDifficulty = difficulty => {

    SettingsStore.update(s => { s.chosenDifficulty = difficulty });
}