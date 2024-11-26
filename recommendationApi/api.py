from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/budget-suggestions', methods=['POST'])
def budget_suggestions():
    try:
        data = request.get_json()
        transactions = data.get('transactions', [])
        limits = data.get('limits', [])

        if not transactions or not limits:
            return jsonify({"error": "Eksik veri gönderildi!"}), 400

        category_totals = {}

        valid_limits = [limit for limit in limits if limit['amount'] > 0]

        for limit in valid_limits:
            for transaction in transactions:
                category = transaction["category"]
                amount = transaction["amount"]
                category_totals[category] = category_totals.get(category, 0) + amount

        suggestions = []
        for limit in valid_limits:
            category = limit["category"]
            suggested_limit = limit["amount"]
            total_spent = category_totals.get(category, 0)

            if total_spent > (suggested_limit * 0.8):
                warning = f"Kategori '{category}' için harcamalar önerilen sınırın %80'ini aşmış durumda."
            else:
                warning = None

            suggestions.append({
                "category": category,
                "total_spent": total_spent,
                "suggested_limit": suggested_limit,
                "warning": warning
            })

        result = {
            "suggestions": suggestions
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
