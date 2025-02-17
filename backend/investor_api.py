from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Paths to your spreadsheets
INFO_PATH = "E:/FrontEnd/Investors/Investor-Info.xlsx"
UPDATES_PATH = "E:/FrontEnd/Investors/Investor-Updates.xlsx"

@app.route('/api/investor-data', methods=['GET'])
def get_investor_data():
    user = request.args.get('user')  # Get investor's username from URL

    if not user:
        return jsonify({"error": "User not provided"}), 400

    try:
        # Load both spreadsheets
        df_info = pd.read_excel(INFO_PATH)
        df_updates = pd.read_excel(UPDATES_PATH)

        # Ensure column names match your spreadsheet headers
        investor_info = df_info[df_info['InvestorName'].str.lower() == user.lower()]
        investor_updates = df_updates[df_updates['InvestorName'].str.lower() == user.lower()]

        if investor_info.empty and investor_updates.empty:
            return jsonify({"error": "Investor not found"}), 404

        # Merge both datasets (priority given to updates)
        combined_data = {}
        if not investor_info.empty:
            combined_data.update(investor_info.iloc[0].to_dict())
        if not investor_updates.empty:
            combined_data.update(investor_updates.iloc[0].to_dict())

        return jsonify(combined_data)  # Return merged data as JSON

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
