#include<bits/stdc++.h>
#define ll          long long
#define pb          push_back
#define fst         first
#define sec         second
#define endl        '\n'
#define rep(i,a,b)	for(int i=a;i<b;i++)
#define IOS ios::sync_with_stdio(false)
#define TIE cin.tie(0),cout.tie(0)
#define y1 cyy
#define fi first
#define se second
#define cnt1(x) __builtin_popcount(x)
#define mk make_pair
#define pb push_back
#define pii pair<int,int>
#define ls(x) (x<<1)
#define rs(x) (x<<1|1)
#define lbt(x) (x&(-x))
#define mod 1000000007
using namespace std;
double eps = 1e-5;

using namespace std;

int main() {
    cout<<"Welcome to Betting Calculator"<<endl;
    double ratio1, ratio2, totalbet;
    cout << "Enter the ratio of team 1: ";
    cin >> ratio1;
    cout << "Enter the ratio of team 2: ";
    cin >> ratio2;
    cout << "Enter the total amount of money available for betting: ";
    cin >> totalbet;

    double bet1 = (ratio2 / (ratio1 + ratio2)) * totalbet; 
    double bet2 = (ratio1 / (ratio1 + ratio2)) * totalbet;

    double payout1 = bet1 * ratio1 - totalbet; 
    double payout2 = bet2 * ratio2 - totalbet;

    if (payout1 > 0 && payout2 > 0) {
        double profit = payout1 > payout2 ? payout1 : payout2;
        cout << "Bet " << bet1 << " on outcome 1, " << bet2 << " on outcome 2, and profit will be " << profit << endl;  
    }
    else if (payout1 > 0) { 
        cout << "Bet " << bet1 << " on outcome 1, and profit will be " << payout1 << endl;
    }
    else if (payout2 > 0) {
        cout << "Bet " << bet2 << " on outcome 2, and profit will be " << payout2 << endl;
    }
    else { 
        cout << "Do Not Bet" << endl;
    }

   return 0;
}