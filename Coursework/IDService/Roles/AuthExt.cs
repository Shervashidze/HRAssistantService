using System.Linq;
using Microsoft.AspNetCore.Http;

namespace WorkersInfoConsolidation.Roles
{
    public static class AuthExt
    {
        public static string GetUserId(this HttpRequest request)
        {
            return request.Query.First(x => x.Key == "_id").Value.ToString();
        }

        public static string GetUserRole(this HttpRequest request)
        {
            return request.Query.First(x => x.Key == "_role").Value.ToString();
        }

        public static bool IsRN(this string role)
        {
            return role == Roles.RN.Name;
        }
    }
}
