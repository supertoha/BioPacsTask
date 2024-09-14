namespace BioPacsTestApi.Models.Responses
{
    public class ResponseBase<T> where T : class
    {
        public bool Ok { get; set; }
        public T Result { get; set; }
    }
}
